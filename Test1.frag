#ifdef GL_ES
precision highp float;
#endif

uniform vec3 u_camera;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D image;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st.y += u_time*0.5*(
        step(0.0,st.x)-
        step(0.12,st.x)*2.+
        step(0.23,st.x)*2.-
        step(0.37,st.x)*2.+
        step(0.495,st.x)*2.-
        step(0.625,st.x)*2.+
        step(0.75,st.x)*2.-
        step(0.875,st.x)*2.
    );
    
    float lines = (4.*sin(st.x*50.)+sin(st.y*50.));
    
    vec2 lv = vec2(lines,lines);

    gl_FragColor = vec4(1.,lv,1.);
}