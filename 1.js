setInterval(function(){myscroll()},100);


function myscroll() {
    var y = window.scrollY;
    var windowheight = window.innerHeight;
    var bodyheight = document.body.clientHeight; 
    p=100*y/(bodyheight-windowheight);
    document.getElementById('bar').innerHTML='<div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="position: sticky; top: 0; width: '+p+'%"></div>';  
}
