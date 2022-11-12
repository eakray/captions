import "./NewYorker.css";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

function NewYorker() {
    const [img, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const printRef = useRef();
    useEffect(() => {
        fetch("https://www.newyorker.com/cartoons/random/randomAPI").then(
            (data) => {
                if (data.status === 200) {
                    return data.json().then((data) => {
                        setImage(data[0].src);
                    });
                }
            }
        );
    }, []);
    const handleSubmit = (event) => {
        setCaption(event.target.value);
    };
    const handleDownload = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, {
            useCORS: true,
        });
        const data = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        if (typeof link.download == "string") {
            link.href = data;
            link.download = "image/jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    };
    return (
        <div className="new-yorker">
            <div className="cartoon" ref={printRef}>
                <div> {img && <img className="picture" src={img} />}</div>
                <div className="caption">{caption}</div>
            </div>
            <input type="text" value={caption} onChange={handleSubmit} />
            <button type="button" onClick={handleDownload}>
                Download
            </button>
        </div>
    );
}

export default NewYorker;
