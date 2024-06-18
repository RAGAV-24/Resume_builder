import React, { useRef, useState, useEffect } from 'react';
import './Paint.css';

const Paint = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('draw');
  const [text, setText] = useState('');
  const [elements, setElements] = useState([]);
  const [currentElement, setCurrentElement] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    canvas.style.width = `${window.innerWidth * 0.8}px`;
    canvas.style.height = `${window.innerHeight * 0.8}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [color, lineWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (tool === 'draw') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    } else if (tool === 'text') {
      const newElement = { type: 'text', text, x: offsetX, y: offsetY, id: Date.now(), fontSize: 20, color };
      setElements((prevElements) => [...prevElements, newElement]);
      setText('');
    }
  };

  const finishDrawing = () => {
    if (tool === 'draw') {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || tool !== 'draw') return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const drawShape = (shape) => {
    const context = contextRef.current;
    const shapeElement = { type: shape, x: 50, y: 50, width: 100, height: 100, id: Date.now(), color };

    context.beginPath();
    if (shape === 'rectangle') {
      context.rect(shapeElement.x, shapeElement.y, shapeElement.width, shapeElement.height);
    } else if (shape === 'circle') {
      context.arc(shapeElement.x + shapeElement.width / 2, shapeElement.y + shapeElement.height / 2, shapeElement.width / 2, 0, 2 * Math.PI);
    }
    context.stroke();

    setElements((prevElements) => [...prevElements, shapeElement]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const newElement = { type: 'image', image: img, x: 0, y: 0, width: img.width / 2, height: img.height / 2, id: Date.now() };
        setElements((prevElements) => [...prevElements, newElement]);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const drawElement = (element) => {
    const context = contextRef.current;
    if (element.type === 'text') {
      context.font = `${element.fontSize}px Arial`;
      context.fillStyle = element.color;
      context.fillText(element.text, element.x, element.y);
    } else if (element.type === 'image') {
      context.drawImage(element.image, element.x, element.y, element.width, element.height);
    } else if (element.type === 'rectangle') {
      context.strokeStyle = element.color;
      context.strokeRect(element.x, element.y, element.width, element.height);
    } else if (element.type === 'circle') {
      context.strokeStyle = element.color;
      context.beginPath();
      context.arc(element.x + element.width / 2, element.y + element.height / 2, element.width / 2, 0, 2 * Math.PI);
      context.stroke();
    }
  };

  const redrawCanvas = () => {
    const context = contextRef.current;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    elements.forEach(drawElement);
  };

  const handleMouseMove = ({ nativeEvent }) => {
    if (currentElement) {
      const { offsetX, offsetY } = nativeEvent;
      if (isResizing) {
        const updatedElements = elements.map((el) =>
          el.id === currentElement.id ? { ...el, width: offsetX - el.x, height: offsetY - el.y } : el
        );
        setElements(updatedElements);
      } else {
        const updatedElements = elements.map((el) =>
          el.id === currentElement.id ? { ...el, x: offsetX, y: offsetY } : el
        );
        setElements(updatedElements);
      }
      redrawCanvas();
    }
  };

  const handleMouseDown = (element, resizing = false) => () => {
    setCurrentElement(element);
    setIsResizing(resizing);
  };

  const handleMouseUp = () => {
    setCurrentElement(null);
    setIsResizing(false);
  };

  return (
    <div className="paint-container">
      <div className="toolbar">
        <button onClick={() => setTool('draw')}>Draw</button>
        <button onClick={() => setTool('text')}>Text</button>
        <button onClick={() => drawShape('rectangle')}>Rectangle</button>
        <button onClick={() => drawShape('circle')}>Circle</button>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
        <input type="file" onChange={handleImageUpload} />
        <div className="color-picker">
          <label htmlFor="color">Color: </label>
          <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="line-width-picker">
          <label htmlFor="lineWidth">Line Width: </label>
          <input
            type="number"
            id="lineWidth"
            value={lineWidth}
            min="1"
            max="10"
            onChange={(e) => setLineWidth(e.target.value)}
          />
        </div>
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <div
        className="elements"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className="element"
            style={{
              position: 'absolute',
              top: element.y,
              left: element.x,
              cursor: 'move',
            }}
            onMouseDown={handleMouseDown(element)}
          >
            {element.type === 'text' && <span style={{ fontSize: element.fontSize, color: element.color }}>{element.text}</span>}
            {element.type === 'image' && (
              <img
                src={element.image.src}
                alt="uploaded"
                style={{ width: element.width, height: element.height }}
              />
            )}
            {element.type !== 'text' && element.type !== 'image' && (
              <div
                style={{
                  width: element.width,
                  height: element.height,
                  backgroundColor: 'transparent',
                  border: '1px solid black',
                }}
              />
            )}
            <div
              className="resize-handle"
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                bottom: '0',
                right: '0',
                cursor: 'nwse-resize',
                backgroundColor: 'red',
              }}
              onMouseDown={handleMouseDown(element, true)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paint;
