#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(){
vec2 st = gl_FragCoord.xy/u_resolution;

const float grid_space = 10.0;

st *= grid_space;
vec2 _st = fract(st);

//float func = 40.*(sin(40.*st.x)+cos(40.*st.y));
float radius = 0.3;

//_st.x += u_time;
/*_st.y += u_time*0.5*(
        step(0.0,st.x)-
        step(1.0,st.x)*2.+
        step(2.0,st.x)*2.-
        step(3.0,st.x)*2.+
        step(4.,st.x)*2.-
        step(5.,st.x)*2.+
        step(6.,st.x)*2.-
        step(7.,st.x)*2.+
        step(8.,st.x)*2.-
        step(9.,st.x)*2.   
    );
_st.x += u_time*0.5*(
        step(0.0,st.y)-
        step(1.0,st.y)*2.+
        step(2.0,st.y)*2.-
        step(3.0,st.y)*2.+
        step(4.,st.y)*2.-
        step(5.,st.y)*2.+
        step(6.,st.y)*2.-
        step(7.,st.y)*2.+
        step(8.,st.y)*2.-
        step(9.,st.y)*2.   
    );
*/    
    float step_builder=0.0;
    float toggle = 2.;
    for(float i =0.; i < grid_space; i+=1.){

        if(i == 0.0){
           step_builder += step(i,st.y);
        }
        step_builder -= step(i,st.y)*toggle;
        toggle*=-1.;
    }

//mod(u_time,2.0)
_st.x += u_time*(step_builder);


float circ_func = smoothstep(radius-0.02,radius+0.02,distance(vec2(0.5),fract(
    
    //_st.x + u_time * step(0.5,_st)
    vec2(_st)

)));

gl_FragColor = vec4(circ_func);
}