#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D   t1;
uniform vec2        t1Resolution;

float plot(float y, float x, bool b){
    if(b){
        return step(y,x)-step(y,x-0.02);
    }
    return step(y,x);

}

float flip_x(float y, float x, bool b){
    vec2 st0 = vec2(x,y);
    st0-=0.5;
    st0=mat2(1.,0.,0.,-1.)*st0;
    st0+=0.5;

    st0.y = st0.y-1.;

    return plot(st0.y,st0.x,b);
}

vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}

const float PI = 3.1415926535;
const float alpha = PI/4.; 

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    
    //Make 50 tiles
    vec2 _st = st * 50.;
    
    _st.x *= 2.;
    _st = fract(_st);
    
    //rotation matrix with positioning in the middle of each tile
    mat2 rotate = mat2(
    cos(alpha)*(_st.x - 0.5),sin(alpha)*(_st.y - 0.5),
    -sin(alpha)*(_st.y - 0.5),cos(alpha)*(_st.x - 0.5));

    _st = rotateUV(_st,alpha);


    //Scale each tile
    mat2 scale = mat2(0.7,0.,0.,0.7);
    
    _st -= 0.5;
    _st = scale * _st;
    _st += 0.5;


    float cr = 
    step(0.4,_st.x)*step(0.1,_st.y)*
    step(0.4,1.-_st.x)*step(0.1,1.-_st.y)+
    step(0.1,_st.x)*step(0.4,_st.y)*
    step(0.1,1.-_st.x)*step(0.4,1.-_st.y);

    vec4 tx = texture2D(t1,st);

    gl_FragColor = vec4(cr*tx); 
}