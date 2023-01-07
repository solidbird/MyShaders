#ifdef GL_ES
precision mediump float;
#endif

#define OCTAVES 6

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(float y, float x){
    return step(y, x) - step(y, x-0.01);
}

float random(float seed) {
    return fract(sin(seed+u_time+dot(vec2(342.34,342.345),vec2(54.3424,65.3453)))*43563.34224);
}

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

//TODO Understand Noise mapping
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm(vec2 st){
    float amp = 1.0;
    float freq = 1.0;

    float lacunarity = 2.;
    float gain = 0.5;
    
    float val = 0.0;

    /*
    Make random looking curve with different points 
    where the aptitude is high
    */
    mat2 rot = mat2(cos(0.5),sin(0.5),
                    -sin(0.5),cos(0.5));


    for(int i = 0; i < OCTAVES; i++){
        val += amp * noise(st*freq);
        st = rot * st * 2.0;
        amp *= gain;
    }

    return val;
}

/*
IDEA: Somehow simplifying function chain of Domain Warping
}*/

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st*=4.0;

    vec2 q = vec2(0.0);
    q.x = fbm(st + vec2(2.4,5.3) );
    q.y = fbm(st + vec2(8.42,3.45) );

    vec2 r = vec2(0.0);
    r.x = fbm(st + q*0.4 + vec2(3.45,2.34));
    r.y = fbm(st + q*1.4 + vec2(5.67,7.52));
    
    vec2 s = vec2(0.0);
    s.x = fbm(st + r*3.4 + q*4.3 + vec2(4.53,35.56));
    s.y = fbm(st + r*2.75 + q*2.3 + vec2(3.64,6.43));

    //Change overall "darkness" by inital value
    vec3 color = mix(
        vec3(0.1765, 0.1176, 0.6392),
        vec3(0.5373, 0.1451, 0.1451),
        fbm(st + s)
    )-0.8;

    //Add the curve on top that brings in noise at different points
    
    color += fbm((st + s) * 20.);

    gl_FragColor = vec4(color,1.0);
}