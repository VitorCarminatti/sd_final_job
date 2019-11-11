print "Server node \n"

require "socket"
require "json"

server = TCPServer.open("localhost", 2000)

actions = []

iterator = 0
ts = 0

loop do
  break if iterator > 15

  Thread.start(server.accept) do |conn|
    msg = JSON.parse(conn.gets)
    actions.push({action: msg['action'], timestamp: msg['ts']})
    ts = [ts, msg['ts']].max + 1
    puts "#{ts} =>> #{msg['action']}"

    conn.puts ts
  end
  
  iterator+=1
end

puts actions
puts ts
