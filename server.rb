require "dino"
require "socket"
require "json"

print "Server node \n"

board = Dino::Board.new(Dino::TxRx.new)
led1 = Dino::Components::Led.new(pin: 11, board: board)
led2 = Dino::Components::Led.new(pin: 8, board: board)

server = TCPServer.open("localhost", 2000)

actions = []

ts = 0

def blink(led)
  led.send(:on)
  sleep(0.5)
  led.send(:off)
end

17.times do
  Thread.start(server.accept) do |conn|
    msg = JSON.parse(conn.gets)
    sleep(5)
    actions.push({ action: msg["action"], timestamp: msg["ts"] })

    if msg["ts"] < ts
      blink(led1)
    else
      blink(led2)
    end

    ts = [ts, msg["ts"]].max + 1
    puts "#{ts} =>> #{msg["action"]}"

    conn.puts ts
  end
end

puts actions
puts ts

open("myfile.out", "w") { |f|
  f.puts JSON.generate(actions)
}
