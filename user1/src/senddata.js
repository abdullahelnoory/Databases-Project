export default function datasend()
 {
      const senddata = async () => {
            const dataToSend = { text: 'Hello from Front hello hello' }; // Example data
          
            try {
              const response = await fetch('http://localhost:6969/endpoint', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
              });
          
              const result = await response.json(); // Handle the server's response
              console.log('Response from server:', result);
            } catch (error) {
              console.error('Error sending data:', error);
            }
          };

return(
<div className="da">
    <button onClick={senddata} className="button">
Hello front
    </button>
</div>

);
 }