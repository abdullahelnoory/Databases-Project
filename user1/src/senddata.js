 
 
 
 
 
 export default function datasend()
 {function senddata()
    {
        const sendData = async () => {
            const dataToSend = { id: 1, task: "New Task" }; // Example data
          
            try {
              const response = await fetch('http://localhost:6969/endpoint', {
                data:"Hello"
              });
          
              const result = await response.json(); // Handle the server's response
              console.log('Response from server:', result);
            } catch (error) {
              console.error('Error sending data:', error);
            }
          };
    }

return(
<div className="da">
    <button onClick={senddata} className="button">
Hello front
    </button>
</div>

);


 }