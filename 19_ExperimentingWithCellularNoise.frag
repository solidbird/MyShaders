#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(float seed) {
    return fract(sin(seed+u_time+dot(vec2(342.34,342.345),vec2(54.3424,65.3453)))*43563.34224);
}

vec2 random2d(vec2 st){
    return vec2(random(st.x),random(st.y));

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= 3.0;

    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    

    vec3 color = vec3(0.0706, 0.1882, 0.5098);

    vec2 point[6];
    point[0] = random2d(st);
    point[1] = vec2(.75,.23);
    point[2] = vec2(.45,.38);
    point[3] = vec2(.53,.74);
    point[4] = vec2(.58,.86);
    point[5] = u_mouse/u_resolution;

    float min_dist = 1.;

    for(int i = 0; i < 6; i++){

        float dir = 1.0;
        for(int p = 0; p < 5; p++){
            point[p].x = dir*0.25*sin(u_time) + 0.5;
            dir *= -1.;
        }

        float dist = distance(st, point[i]);

        min_dist = min(min_dist,dist);
    }

    color += min_dist;
    //color += step(.7,abs(sin(50.*min_dist)));
    color += 1.-step(.01,min_dist);

    gl_FragColor = vec4(color,1.0);
}