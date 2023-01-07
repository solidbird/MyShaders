#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float draw_circle(vec2 st, vec2 start_position, float radius){
    vec2 pos = start_position;
    vec2 mouse_pos_norm = u_mouse.xy/u_resolution;
    vec2 coords_move[100];

    float add_line = smoothstep(radius-0.01,radius,distance(st,vec2(0.5)));
    int castname = int(floor(mod(u_time*10.,100.)));

    for(int i = 0; i < 100; i++){
        if(i == 0){
            coords_move[0] = vec2(0.5,0.5);
        }
        coords_move[i].y = coords_move[i-1].y + 0.01;
    }

    add_line *=  smoothstep(radius-0.01,radius,distance(st,coords_move[castname]));
    
    return add_line;

}


vec2 rise = vec2(0.5);
float pts = 1.-smoothstep(0.02-0.01,0.02,distance(gl_FragCoord.xy/u_resolution,vec2(0.5)));    
    
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    //float pts = mix(1.,,);
    float radius = 0.02;

    //float pts = draw_circle(st, vec2(0.5), radius);
    for(int i = 0; i <= 100; i++){
        pts += 1.-smoothstep(radius-0.01,radius,distance(st,vec2(u_time)));
    }

    /*if(distance(vec2(0.5),u_mouse/u_resolution.xy) < radius){
        gl_FragColor = vec4(pts,0.0,0.0,1.0);
    }else{
        gl_FragColor = vec4(pts);
    }*/
    gl_FragColor = vec4(pts);

    
}