#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D t0;

float random(float x){
    return fract(sin(x)*1e0);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 _st = st * 20.;

    vec2 ist = floor(_st);
    vec2 fst = fract(_st);

    vec4 tx = texture2D(t0,st);

    //ist.x += sin(u_time)*4.;
    float circle = smoothstep(5.-2.,5., distance(ist,vec2(10.)));
    

    gl_FragColor = vec4(step(ist.y,ist.x));
}