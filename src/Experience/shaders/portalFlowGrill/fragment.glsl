uniform float iTime;
uniform float uStrength;
uniform sampler2D uTexture;
uniform vec3 uColor;
varying vec2 vUv;


vec2 random(vec2 st) {
    float x = fract(sin(dot(st.xy,vec2(3.,72.233)))*43758.5453123);
    float y = fract(x * 77.0);
    return vec2(x,y);
}

float smoothNoise(vec2 uv) {
    
    vec2 repeatedUv = smoothstep(0.0, 1.0, fract(uv));
    
    vec2 tileCoords = floor(uv);

    float x1 = random(tileCoords).x;
    float x2 = random(tileCoords + vec2(1.0, 0.0)).x;
    
    float xValues = mix(x1, x2, repeatedUv.x);
    
    float y1 = random(tileCoords + vec2(0 ,1)).x;
    float y2 = random(tileCoords + vec2(1, 1)).x;
    
    float yValues = mix(y1, y2, repeatedUv.x);
    
    return mix(xValues, yValues, repeatedUv.y);
}

float cellularNoise(vec2 uv, float size) {
    vec2 repeatedUv = fract(uv * size);
    vec2 uvCoords = floor((uv * size));
    
    vec2 point = vec2(0.5);
    
    float dist = 1.0;
    float currentDistance = 0.0;
    
    for(float i = -1.0; i <= 1.0; i++) {
        for(float j = -1.0; j <= 1.0; j++) {
            vec2 neighborTile = vec2(i,j);
            
            point = random(neighborTile + uvCoords);
            
            point += sin(iTime * 1.5 * point) * 0.3;
            
            currentDistance = distance(point + neighborTile, repeatedUv);
            
            dist = min(dist, currentDistance);
        }
    }
    
    return dist;
}

float border(vec2 uv) {
    float strenght = 0.04;  // originall 0.02

    float col = strenght / uv.x;

    col += strenght / uv.y;
    col = smoothstep(0.1, 1.0, col);
    
    return col * .4;
}


void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;
    
    float noise = smoothNoise(uv * 9.0) * 0.05;
    uv += noise;
    
    vec2 movingUv = uv;
    movingUv.y += iTime * 0.07;
    movingUv += noise;
    
    
    float cells1 = cellularNoise(movingUv, 3.0);
    cells1 = pow(cells1, 6.0) * 0.5;
    
    float cells2 = cellularNoise(movingUv, 6.0);
    cells2 = pow(cells2, 5.0) * 0.1;
    
    float cells = cells1 + cells2;
    
    float borders = border(1.05 - uv) + border(uv);
    
    vec3 blue = uColor;
    
    vec4 image = texture2D(uTexture, vUv);
    vec3 color = blue*(borders + cells);
    color += blue * 0.1;

    
    // color = clamp(color, 0.0, 1.0);

    color = mix(color, image.rgb, uStrength); // 0.1
    // color = smoothstep(color, image.rgb, color);
    

    // color = step(color, 0.01);
    // gl_FragColor = vec4(image);
    gl_FragColor = vec4(color,1.0);
}