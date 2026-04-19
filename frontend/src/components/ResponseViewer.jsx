function ResponseViewer() {
   return (
    <div>
        <div>Status: 200 OK</div>

        <div>
            <strong>Headers:</strong>
            <div>Date: ...</div>
            <div>Content-Type: ...</div>
        </div>

        <div>
            <strong>Body:</strong>
            <div>message: ok</div>
        </div>
    </div>
   )
}

export default ResponseViewer;