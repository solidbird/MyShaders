#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(1.0,.0,.0);
    vec2 thicc = vec2(0.02);
    
    float zoom_const = sin(u_time);
    //float rad_angle = sin(u_time);


    mat2 zoom_m = mat2(
        vec2(zoom_const,0.0),
        vec2(0.0,zoom_const)
    );
    
    mat2 rot_m = mat2(
        vec2(cos(u_time),sin(u_time)),
        vec2(-sin(u_time),cos(u_time))
    );
    
    st -= vec2(0.5);
    st = zoom_m*(rot_m*st);
    st += vec2(0.5);

    vec2 rect1 = step(vec2(0.1,0.46),st);
    vec2 rect2 = step(vec2(0.1,0.46),vec2(1.-st.x,1.-st.y));
    vec2 rect3 = step(vec2(0.46,0.1),st);
    vec2 rect4 = step(vec2(0.46,0.1),vec2(1.-st.x,1.-st.y));

    color += vec3(rect1.x * rect1.y * rect2.x * rect2.y);
    color += vec3(rect3.x * rect3.y * rect4.x * rect4.y);
    
    if(color <= vec3(0.)){
        
    }
    
    gl_FragColor = vec4(color,1.0);
}