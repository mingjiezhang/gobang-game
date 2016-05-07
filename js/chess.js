var board=document.getElementById("chess");
if(board.getContext)
{
	var state=true;
	var context=board.getContext("2d");
    //画棋盘
	for(var i=0;i<15;i++)
	{
		context.strokeStyle="black";
		context.beginPath();
		context.moveTo(15,i*30+15);
		context.lineTo(435,i*30+15);
        context.stroke();

        context.beginPath();
		context.moveTo(i*30+15,15);
		context.lineTo(i*30+15,435);
        context.stroke();
	}




    //定义下棋落子的函数
	function step(i,j,turn)
	{
	var gradient=context.createRadialGradient(i*30+15+2,j*30+15+2,0,i*30+15,j*30+15,8);
	if(turn)
	{
		gradient.addColorStop(0,"white");
	    gradient.addColorStop(1,"black");
	}
    else
    {
        gradient.addColorStop(0,"white");
	    gradient.addColorStop(1,"gray");
    }
	context.fillStyle=gradient;
	context.beginPath();
	context.arc(i*30+15,j*30+15,10,0,2*Math.PI);
	context.fill();
    }
    //定义棋盘数组
    var array=[];
    for(var i=0;i<15;i++)
    {
    	array[i]=[];
    	for(var j=0;j<15;j++)
    	{
    		array[i][j]=0;
    	}
    }

    var count=0;
    var wins=[];
    //定义赢的类型
    for(var i=0;i<15;i++)
    {
    	wins[i]=[];
    	for(var j=0;j<15;j++)
    	{
    		wins[i][j]=[];
    	}
    }

    for(var i=0;i<15;i++)
    {
    	for(var j=0;j<11;j++)
    	{
    		for(var k=0;k<5;k++)
    		{
    			wins[i][j+k][count]=true;
    		}
    		count++;
    	}
    }

    for(var i=0;i<15;i++)
    {
    	for(var j=0;j<11;j++)
    	{
    		for(var k=0;k<5;k++)
    		{
    			wins[j+k][i][count]=true;
    		}
    		count++;
    	}
    }

    for(var i=0;i<11;i++)
    {
    	for(var j=0;j<11;j++)
    	{
    		for(var k=0;k<5;k++)
    		{
    			wins[i+k][j+k][count]=true;
    		}
    		count++;
    	}
    }

    for(var i=0;i<11;i++)
    {
    	for(var j=14;j>3;j--)
    	{
    		for(var k=0;k<5;k++)
    		{
    			wins[i+k][j-k][count]=true;
    		}
    		count++;
    	}
    }


    var me=[];
    var computer=[];
    for(var i=0;i<count;i++)
    {
    	me[i]=0;
    	computer[i]=0;
    }

    var turn=true;
    board.onclick=function(e){
    if(!state)
    {
    	return;
    }
    	var x=e.offsetX;
        var y=e.offsetY;
        var i=Math.floor(x/30);
        var j=Math.floor(y/30);
        if(array[i][j]==0)
        {
        	step(i,j,turn);
        	if(turn)
        	{
        		array[i][j]=1;
        		for(var n=0;n<count;n++)
                {
                if(wins[i][j][n])
                {
                	me[n]++;
                	computer[n]=10;
                	if(me[n]==5)
                	{
                		alert("Black win");
                		state=false;
                	}
                }
                }
        	}
        	else
        	{
        		array[i][j]=2;
        		for(var n=0;n<count;n++)
                {
                if(wins[i][j][n])
                {
                	computer[n]++;
                	me[n]=10;
                	if(computer[n]==5)
                	{
                		alert("White win");
                		state=false;
                	}
                }
                }
        	}

            turn=!turn;
        }
    }

}