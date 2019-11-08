print "Client node 2 \n"

require "socket"
require "json"
require "date"
ts = 0

loop do
  sleep(rand(5))
  ts+=10
  TCPSocket.open("localhost", 2000).puts(JSON.generate({action: 'update', ts: ts}))
end