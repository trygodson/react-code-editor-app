import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  err: String;
}
const html = `
<html>
  <head></head>
  <body style="background-color: white; color: black;">
    <div id="root"></div>
    <script>

      const handleError = (err) => {
        const root = document.querySelector('#root')
        root.innerHTML = '<div style="color: red;"><h3>Runtime Error</h3>' + err + '</div>'

      }

      window.addEventListener('error', (e) => {
        e.preventDefault();
        handleError(e.error)
      })
      window.addEventListener('message', (event) => {
        try{

          eval(event.data)
        }catch(err){
          handleError(err)
        }
      }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview">
      <iframe ref={iframe} srcDoc={html} sandbox="allow-scripts" />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
