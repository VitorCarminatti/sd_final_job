print "Client node 1 \n"

require "socket"
require "json"
require "date"

loop do
  sleep(rand(5))
  TCPSocket.open("localhost", 2000).puts(JSON.generate({action: 'insert', time: DateTime.now}))
end