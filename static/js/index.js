//https://www.eclipse.org/paho/clients/js/

var btn=document.getElementById('btn'), contador=0;
function cambio()
{ if (contador==0)
	{
	message = new Paho.MQTT.Message("ENCENDER");
	message.destinationName = "israelnoriega1998@hotmail.com/test1";
	client.send(message);
	contador=1;
	}
 else
	{
	message = new Paho.MQTT.Message("APAGAR");
	message.destinationName = "israelnoriega1998@hotmail.com/test1";
	client.send(message);
	contador=0;
	}
}

 // Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "israelnoriega1998@hotmail.com",
    password: "israel1998",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("israelnoriega1998@hotmail.com/test1");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "israelnoriega1998@hotmail.com/test";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

// called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  //comando para poner el sensor desde esp32
	  document.getElementById("sensor").innerHTML=message.payloadString;
	  if(message.payloadString==='Encendido'){
		
	  } else if(message.payloadString==='Apagado'){
		
 		
	  }
	  if(message.payloadString==='Encendido'){
	  	document.getElementById("btn").innerHTML="Apagar";
	  } else if(message.payloadString==='Apagado'){
		document.getElementById("btn").innerHTML="Encender";
	  }
	  
  }


