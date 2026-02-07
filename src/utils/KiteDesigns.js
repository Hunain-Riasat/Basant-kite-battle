// Pakistani/Punjabi traditional kite designs
export const drawPakistaniKite = (ctx, x, y, size, color, angle) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 4);
  
  // Main kite body (diamond)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -size / 2);
  ctx.lineTo(size / 2, 0);
  ctx.lineTo(0, size / 2);
  ctx.lineTo(-size / 2, 0);
  ctx.closePath();
  ctx.fill();
  
  // Traditional Pakistani patterns
  
  // Cross lines (کشیدگی - Kasheedgi style)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -size / 2);
  ctx.lineTo(0, size / 2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(-size / 2, 0);
  ctx.lineTo(size / 2, 0);
  ctx.stroke();
  
  // Decorative border (دھاری - Dhari style)
  ctx.strokeStyle = '#FFD700'; // Gold color
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -size / 2 + 3);
  ctx.lineTo(size / 2 - 3, 0);
  ctx.lineTo(0, size / 2 - 3);
  ctx.lineTo(-size / 2 + 3, 0);
  ctx.closePath();
  ctx.stroke();
  
  // Center star/flower pattern (پھول - Phool design)
  const starSize = size / 6;
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const radius = i % 2 === 0 ? starSize : starSize / 2;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  
  // Corner decorations (کونے - Kone)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  const cornerSize = size / 10;
  
  // Top corner
  ctx.beginPath();
  ctx.arc(0, -size / 2 + cornerSize, cornerSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Right corner
  ctx.beginPath();
  ctx.arc(size / 2 - cornerSize, 0, cornerSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Bottom corner
  ctx.beginPath();
  ctx.arc(0, size / 2 - cornerSize, cornerSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Left corner
  ctx.beginPath();
  ctx.arc(-size / 2 + cornerSize, 0, cornerSize, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

// Traditional Basant colors
export const BASANT_COLORS = [
  '#FF1493', // Hot Pink (گلابی)
  '#00FF00', // Bright Green (ہرا)
  '#FFFF00', // Yellow (پیلا)
  '#FF4500', // Orange Red (نارنجی)
  '#9400D3', // Purple (جامنی)
  '#00CED1', // Turquoise (فیروزی)
  '#FF69B4', // Light Pink
  '#32CD32', // Lime Green
];

// Punjabi pattern variations
export const drawPunjabiPatterns = {
  // Phulkari style (floral)
  phulkari: (ctx, size) => {
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 1;
    
    // Small flowers in corners
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 2);
      
      for (let j = 0; j < 5; j++) {
        const angle = (j * Math.PI * 2) / 5;
        const r = size / 8;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r - size / 3;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }
  },
  
  // Geometric Punjabi patterns
  geometric: (ctx, size) => {
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
    ctx.lineWidth = 1;
    
    // Zigzag pattern
    ctx.beginPath();
    for (let i = -size/4; i <= size/4; i += size/8) {
      ctx.moveTo(i, -size/4);
      ctx.lineTo(i + size/16, 0);
      ctx.lineTo(i, size/4);
    }
    ctx.stroke();
  }
};