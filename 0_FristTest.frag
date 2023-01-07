#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void rectDraw(vec2 st, vec3 c, vec2 s, vec2 p){
    vec3 color = c; 
    vec2 rect = vec2(0.1);

    vec2 coord = vec2(.01);

    /*vec2 bl = step(coord,st);
    vec2 tr = step(coord,1.-st);
    vec2 tl = step(coord,vec2(st.x,1.-st.y));
    vec2 br = step(coord,vec2(1.-st.x,st.y));

    float pct = 
        bl.x * bl.y *
        tr.x * tr.y *
        tl.x * tl.y *
        br.x * br.y;

    vec2 size = 
    step(coord,vec2(1.-st.x-(1.-height),st.y-(1.-height)));
    vec2 trans_pos =
    step(vec2(pos.x,pos.y),vec2(st.x,1.-st.y));*/ 
    vec2 size = step(coord,vec2(1.-st.x-(1.-s.x)+p.x, st.y-(1.-s.y)+p.y));
    vec2 trans_pos = step(p,vec2(st.x,1.-st.y));

    float pct = size.y * size.x * trans_pos.x * trans_pos.y;

    color *= vec3(pct);
    
    gl_FragColor = vec4(color,1.0);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float sin_t = sin(u_time*20.)*0.05 + 0.5;
    float cos_t = cos(u_time*20.)*0.05 + 0.5;

    rectDraw(st,vec3(0.,0.,1.),vec2(0.02),vec2(cos_t,sin_t));
    
}
