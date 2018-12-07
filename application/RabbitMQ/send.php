<?php
include "/var/www/html/codeigniter/application/RabbitMQ/receive.php";
include "/var/www/html/codeigniter/application/RabbitMQ/receive.php";
require_once '/var/www/html/codeigniter/application/RabbitMQ/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class SendMail
{
    /**
     * @method sendEmail()
     * @var connection creates the AMPQSTREAMconnection
     * @return void
     */
    public function sendEmail($toEmail, $subject, $body)
    {
        /**
         * Establish the connection by giving servername,port,username,password.
         * AMQPConnection allows us to create a new connection to the RabbitMQ server and
         * allows us to create messages that we can push to the queue
         */
        $connection = new AMQPStreamConnection($this->RabbitMQConstantsRef->server, $this->RabbitMQConstantsRef->port, $this->RabbitMQConstantsRef->username, $this->RabbitMQConstantsRef->password);

        /**
         * Create channel forcommunication
         */
        $channel = $connection->channel();
        /**
         * Declare queue and properties(passive,durable,exlusive,autodelete)
         */
        $channel->queue_declare($this->RabbitMQConstantsRef->quename, false, false, false, false);

        $data = json_encode(array(
            "from"       => $this->RabbitMQConstantsRef->fromName,
            "from_email" => $this->RabbitMQConstantsRef->Email,
            "to_email"   => $toEmail,
            "subject"    => $subject,
            "message"    => $body,
        ));
        /**
         * Create a messge
         * @var json decoded data
         * @var delivery mode
         */
        $msg = new AMQPMessage($data, array('delivery_mode' => $this->RabbitMQConstantsRef->mode));

        /**
         * publish the message by calling the basic_publish()
         * @param message
         * @param exchange information
         * @param quename
         */
        $channel->basic_publish($msg, '', $this->RabbitMQConstantsRef->quename);

        $obj = new Receiver();
        /**
         * calling the receiver
         */
        $obj->receiverMail();

        $channel->close();

        $connection->close();
        return "Success";

    }
}
