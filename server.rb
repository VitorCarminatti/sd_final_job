print "Server node \n"

require "socket"
require "json"

server = TCPServer.open("localhost", 2000)

loop do
  Thread.start(server.accept) do |conn|
    msg = conn.gets
    puts(JSON.parse(msg))
  end
end