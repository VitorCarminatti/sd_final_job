print "Client node 3 \n"

require "socket"

loop do
  sleep(rand(5))
  TCPSocket.open("localhost", 2000).puts("Mensagem do client 3")
end