#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec2 squareImaginary(vec2 number){
	return vec2(
		pow(number.x,2.)-pow(number.y,2.),
		2.*number.x*number.y
	);
}

const float maxIterations = 1000.;

float iterateMandelbrot(vec2 coord){
	vec2 z = vec2(0.,0.);
	for(float i=0.;i<maxIterations;i+=1.){
		z = squareImaginary(z) + coord;
		if(length(z)>2.) return i/maxIterations;
	}
	return maxIterations;
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    st -= 0.5;
    st = mat2(1./u_time*2.,0.,0.,1./u_time*2.) * st;
    st -= 0.5;


    gl_FragColor = vec4(iterateMandelbrot(st));
}