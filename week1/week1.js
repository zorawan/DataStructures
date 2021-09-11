// npm install got
// mkdir data

const fs = require('fs');
const got = require('got');
(async () => {
	try {
	    const url = ['https://parsons.nyc/aa/m01.html','https://parsons.nyc/aa/m02.html',
	    'https://parsons.nyc/aa/m03.html','https://parsons.nyc/aa/m04.html','https://parsons.nyc/aa/m05.html',
	    'https://parsons.nyc/aa/m06.html','https://parsons.nyc/aa/m07.html',
	    'https://parsons.nyc/aa/m08.html','https://parsons.nyc/aa/m09.html','https://parsons.nyc/aa/m10.html'];

		const files = ['/home/ec2-user/environment/week1/data/m01.txt','/home/ec2-user/environment/week1/data/m02.txt',
		'/home/ec2-user/environment/week1/data/m03.txt','/home/ec2-user/environment/week1/data/m04.txt',
		'/home/ec2-user/environment/week1/data/m05.txt','/home/ec2-user/environment/week1/data/m06.txt',
		'/home/ec2-user/environment/week1/data/m07.txt','/home/ec2-user/environment/week1/data/m08.txt',
		'/home/ec2-user/environment/week1/data/m09.txt','/home/ec2-user/environment/week1/data/m10.txt'];
		
		for (var i=0; i< url.length; i++){
		    var response = await got(url[i]);
		    fs.writeFileSync(files[i], response.body);
		}
	
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	} 
})();