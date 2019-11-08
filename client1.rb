print "Client node 1 \n"

require "socket"
require "json"
require "date"
ts = 0

loop do
  sleep(rand(5))
  ts+=5
  TCPSocket.open("localhost", 2000).puts(JSON.generate({action: 'insert', ts: ts}))
end