require "socket"
require "json"
require "date"

def getHour()
  require "net/http"

  uri = URI("http://worldtimeapi.org/api/timezone/America/Sao_Paulo")

  res = Net::HTTP.get_response(uri)

  data = DateTime.parse(JSON.parse(res.body)["datetime"])

  data.hour
end

puts "Client node 3 \n"
puts "Type 'K' to kill the client at any moment \n"

ts = 1
kill = ''

socketIni = TCPSocket.open("localhost", 2000)
socketIni.puts(JSON.generate({ client: "client3", ts: ts, alive: true, started: true }))

socketFim = TCPSocket.open("localhost", 2000)

loop do
  socket = TCPSocket.open("localhost", 2000)
  
  sleep(rand(5))
  ts += getHour()
  socket.puts(JSON.generate({ client: "client3", ts: ts, alive: true, started: false }))

  server_ts = socket.gets.chomp
  ts = [ts, server_ts.to_i].max + 1

  puts "Server: #{server_ts}"
  puts "Client: #{ts}"

  Thread.start do
    kill = gets.chomp
  end

  if kill == 'K'
    socketFim.puts(JSON.generate({ client: "client3", ts: ts, alive: false, started: false }))
    break
  end
end
