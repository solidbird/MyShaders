#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float grid_size = 50.;
float radius = 0.3;
 

float stepBuilderFunc(float coord){
    float step_builder=0.0;
    float toggle = 2.;

   for(float i =0.; i < grid_size; i+=1.0){

        if(i == 0.){
            step_builder += step(i,coord);
        }
        step_builder -= step(i,coord)*toggle;
        toggle*=-1.;
    }

    return step_builder;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    st = st*grid_size;

    vec2 _st = fract(st);

    if(fract(u_time) > 0.5){
        
        _st.x += u_time*2.*(stepBuilderFuncyst.y));
    }else{

        _st.y += u_time*2.*(stepBuilderFunc(st.x));
    }

    radius = 0.5;
    float circle = smoothstep(radius-0.02,radius+0.02,distance(vec2(0.5),fract(_st)));

    gl_FragColor = vec4(vec3(circle),1.);
}