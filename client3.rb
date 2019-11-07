print "Client node 3 \n"

require "socket"
require "json"
require "date"
ts = 0

loop do
  sleep(rand(5))
  TCPSocket.open("localhost", 2000).puts(JSON.generate({action: 'delete', ts: ts}))
  ts+=1
end