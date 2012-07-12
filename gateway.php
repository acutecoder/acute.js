<?php

	
	if( isset($_GET['hey']) && $_GET['hey'] != '' ) {
		
		//$var = $_GET['hey'];
		//echo $var;
		
		$a = array(
			'a' => 'something',
			'b' => 'something else'
		);
		
		return json_encode($a);
		
	}
	
	//echo "gateway";

?>