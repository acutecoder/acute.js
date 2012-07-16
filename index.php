<?php
    
?><!DOCTYPE html>

<html>
	<head>
		<title>js-acute</title>
		
		<style type = "text/css">
			
			#wrapper{
				width: 900px;
				height: 600px;
				margin: auto auto;
				position:relative;
				border: solid 1px #000;
			}
			
			#container{
				width: 100px;
				height: 50px;
				border: solid 1px #000;
				line-height: 50px;
				text-align: center;
				position:absolute;
				margin: auto auto;
				top: 200px;
				left: 300px;
			}
			
			#btn{
				position: absolute;
				top: 200px;
				right: 0;
			}
			
		</style>
		
	</head>
	<body>
		
		
		<div id = 'wrapper'>
			
			<div id = 'container'>
				
				hi
				
			</div>
			
			<script id="con_temp" type="template">
				
				<table>
					
					<tr>
						<td>{{a}}</td>
					</tr>
					<tr>
						<td>{{b}}</td>
					</tr>
					
				</table>
				
				
			</script>
			
			
			
			
			<div id = 'aaa'>
				
			</div>
			
			
			<button id = 'btn'>something</button>
			
		</div>
	
		<script type = "text/javascript" src = "jquery-1.7.min.js"></script>
		<script type = 'text/javascript' src = 'utils.js'></script>
		<script type="text/javascript" src="acute.js"></script>
		<script type="text/javascript" src="a.js"></script>
		<script type="text/javascript" src="template.js"></script>
		
		<script type="text/javascript" src="app.js"></script>
		

		
	</body>
</html>
