#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    //float zoom_value = fract(sin(u_time*0.1));
    float _radius = 0.001;
    vec2 _st = st;
    vec2 dist = _st-vec2((sin(u_time)+cos(u_time))*0.5+0.5);
	float lol = 1.-smoothstep(_radius-(0.0),
                         _radius+(0.1),
                         dot(dist,dist)*0.3);

    //float zoom_value = distance(st,vec2(0.5));
    float zoom_value = lol;
    mat2 zoom_m = mat2(1./zoom_value,0.,0.,1./zoom_value);

    float pct = distance(st,vec2(0.5));

    st-=vec2(0.5);
    st = zoom_m * st;
    st-=vec2(0.5);

    float p = (5000.*(sin(st.x*100.)*cos(st.y*100.)));
    vec4 sceans = vec4(p);
    vec4 pct1 = vec4(p) * pct;

    vec3 color = vec3(1.,1.,0.);
    color *= p;

    gl_FragColor = vec4(color,1.);

}