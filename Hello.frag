#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_tex0;

uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 img = vec4(st.x,st.y,0.0,1.0);

    img = texture2D(u_tex0,st);
    vec4 tmp_img = img;
    img.rgb = vec3(1.0);
    img.a = dot(dot(tmp_img.r, tmp_img.g), tmp_img.b);
    
    vec4 f = smoothstep(0.2,0.8,distance(tmp_img,vec2(fract(u_time))));

    gl_FragColor = f;
}