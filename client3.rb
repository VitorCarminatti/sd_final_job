def getHour()
  require "net/http"
  require "date"

  uri = URI("http://worldtimeapi.org/api/timezone/Europe/Moscow")

  res = Net::HTTP.get_response(uri)

  data = DateTime.parse(JSON.parse(res.body)["datetime"])

  data.hour
end

print "Client node 3 \n"

require "socket"
require "json"
require "date"

ts = 0

loop do
  socket = TCPSocket.open("localhost", 2000)
  sleep(rand(5))
  ts += getHour()
  socket.puts(JSON.generate({ client: "client3", ts: ts }))

  server_ts = socket.gets.chomp
  ts = [ts, server_ts.to_i].max + 1

  puts "Server: #{server_ts}"
  puts "Client: #{ts}"
end
