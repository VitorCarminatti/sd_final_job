require "dino"
require "socket"
require "json"

print "Server node \n"

# board = Dino::Board.new(Dino::TxRx.new)
# led1 = Dino::Components::Led.new(pin: 11, board: board)
# led2 = Dino::Components::Led.new(pin: 8, board: board)

server = TCPServer.open("localhost", 2000)

actions = []

ts = 0

# def blink(led)
#   led.send(:on)
#   sleep(0.5)
#   led.send(:off)
# end

loop do
  Thread.start(server.accept) do |conn|
    
    msg = JSON.parse(conn.gets)
    sleep(5)

    # if msg["ts"] < ts
    #   blink(led1)
    # else
    #   blink(led2)
    # end

    ts = [ts, msg["ts"]].max + 1
    actions.push({ client: msg["client"], timestamp: msg["ts"], server_ts: ts, alive: msg["alive"] })
    
    open("./timestamp-monitor/src/data_report.json", "w") { |f|
      f.puts JSON.generate(actions)
    }

    puts "#{ts} =>> #{msg["client"]}"
    
    conn.puts ts
  end
end

puts actions
puts ts
