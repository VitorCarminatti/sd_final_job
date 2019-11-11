def getHour()
  require 'net/http'
  require 'date'

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
  sleep(rand(5))
  ts+=getHour()
  TCPSocket.open("localhost", 2000).puts(JSON.generate({action: 'delete', ts: ts}))
end