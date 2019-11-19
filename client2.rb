require "socket"
require "json"
require "date"

def getHour()
  require "net/http"

  uri = URI("http://worldtimeapi.org/api/timezone/Asia/Hong_Kong")

  res = Net::HTTP.get_response(uri)

  data = DateTime.parse(JSON.parse(res.body)["datetime"])

  data.hour
end

puts "Client node 2 \n"
puts "Type K to stop the client at any moment \n"

ts = 0
kill = ''
socket2 = TCPSocket.open("localhost", 2000)

loop do
  socket = TCPSocket.open("localhost", 2000)
  sleep(rand(5))
  ts += getHour()
  socket.puts(JSON.generate({ client: "client2", ts: ts, alive: true }))

  server_ts = socket.gets.chomp
  ts = [ts, server_ts.to_i].max + 1

  puts "Server: #{server_ts}"
  puts "Client: #{ts}"

  Thread.start do
    kill = gets.chomp
  end

  if kill == 'K'
    socket2.puts(JSON.generate({ client: "client2", ts: ts, alive: false }))
    break
  end
end
