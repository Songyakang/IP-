let ipaddress = new Vue({
		el:'#content',
		data:{
			ipaddress:'',
			wordNetworkMask:'',
			available:'',
			Networka:'',
		},
		computed:{
			ipCalculate:function(){//匹配ip
				if(this.ipaddress.length == 0){
					return '';
				}
				return this.stringarg();
			},
			wordNetworkMaskCalculate: function(){//计算子网掩码
				if(this.wordNetworkMask.length == 0){
					return '';
				}
				if(this.wordNetworkMask.length <=2){
					return this.networkMaskCalculate2();
				}
				return this.networkMaskCalculate();
			},
			all:function(){//ip可用数
				if(this.wordNetworkMask.length == 0 || this.ipaddress.length == 0){
					return '';
				}
				return this.availableCalculate();
			},
			maxip: function(){
				if(this.wordNetworkMask.length == 0 || this.ipaddress.length == 0){
					return '';
				}
				return this.maxipCalculate();
			},
			minip: function(){
				if(this.wordNetworkMask.length == 0 || this.ipaddress.length == 0){
					return '';
				}
				return this.minipCalculate();
			},
			networkwei: function(){
				if(this.wordNetworkMask.length == 0 || this.ipaddress.length == 0){
					return '';
				}
				return this.networkweiCalculate();
			},
			guangbo: function(){
				if(this.wordNetworkMask.length == 0 || this.ipaddress.length == 0){
					return '';
				}
				return this.guangboCalculate();
			}
			
		},
		methods:{
			stringarg: function(){//匹配ip地址
				let str = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
				if(str.test(this.ipaddress) == true){
					return this.ipaddress
				}
				else{
					return '请输入正确的ip地址'
				}
			},
			networkMaskCalculate:function(){//子网掩码
				let wordNetworkMask = '';
				let str = this.wordNetworkMask ;
				str = str.split(".");
				if(str.length != 4){
					return '请输入正确的子网掩码'
				}
				for(let i = 0 ; i < str.length ; i++){
					str[i] = Number(str[i]).toString(2).padStart(8,'0');
					wordNetworkMask = wordNetworkMask + str[i];
				}
				this.available = wordNetworkMask;
				str = wordNetworkMask.split("0");
				for(let i = 1 ; i < str.length ; i++){
					if(str[i] != ''){
						return '请输入正确的子网掩码'
					}
				}
				return this.wordNetworkMask
			},
			networkMaskCalculate2:function(){
				let wordNetworkMask = '';
				for(let i = 0 ; i < this.wordNetworkMask ; i++){
					wordNetworkMask = wordNetworkMask + 1;
				}
				/* 填充子网长度 */
				wordNetworkMask = wordNetworkMask.padEnd(32,'0');
				this.available = wordNetworkMask;
				/* 将子网转换为10进制 */
				
				
				wordNetworkMask = this.piapia(wordNetworkMask);
				
				return wordNetworkMask
			},
			availableCalculate: function(){//ip可用计算
				let str2 = this.nibian();

				for(let i = 0 ; i < str2.length ; i++){
					if(str2[i] == 0){
						str2[i] = 1
					}else{
						str2[i] = str2[i] + 1
					}
				}
				nums = str2[0] * str2[1] * str2[2] * str2[3] -2;
				return nums
			},
			networkweiCalculate:function(){//获取网络位
				let str = this.piapia(this.available);
				let aa = this.biabia(str);
				let index = aa.indexOf('0',0);
				
				str = '';
				let ip = this.ipaddress.split('.');//获取ip地址
				let ip2 = '';
				for(let i = 0 ; i < ip.length ; i++){
					ip2 = ip2 + Number(ip[i]).toString(2).padStart(8,'0')
				}
				let f = [...ip2]
				for(index ; index < f.length ; index++){
					f[index] = 0;
				}
				
				for(let i = 0 ; i < f.length ; i++){
					str = str + f[i];
				}
				str = this.piapia(str)
				this.Networka = str;
				return str;
			},
			maxipCalculate: function(){//最大ip
				let a = this.nibian();
				let ip = this.Networka.split('.');
				let answer = [];
				for(let i = 0 ; i < ip.length ; i++){
					answer.push(Number(a[i])+Number(ip[i]))
				}
				answer[3] = answer[3]-1;
				answer = answer[0]+'.' + answer[1]+'.' + answer[2]+'.' + answer[3];
				return answer;
			},
			
			minipCalculate: function(){//最小ip
				let a = this.nibian();
				let ip = this.Networka.split('.');
				ip[3] = Number(ip[3])+1;
				ip = ip[0]+'.'+ ip[1]+'.'+ ip[2]+'.'+ ip[3]
				return ip;
			},
			guangboCalculate:function(){//广播地址
				let a = this.nibian();
				let ip = this.Networka.split('.');
				let answer = [];
				for(let i = 0 ; i < ip.length ; i++){
					answer.push(Number(a[i])+Number(ip[i]))
				}
				answer = answer[0]+'.' + answer[1]+'.' + answer[2]+'.' + answer[3];
				return answer;
			},
			
			nibian: function(){//子网计算
				let nums = 0;
				let str = this.available;
				let str2 = '';
				for(let i = 0 ; i < str.length ; i++){
					if(str[i] == '0'){
						str2 = str2 + 1;
					}else{
						str2 = str2 + 0;
					}
				}
				let a = parseInt(str2.substring(0,8),2);
				let b = parseInt(str2.substring(8,16),2);
				let c = parseInt(str2.substring(16,24),2);
				let d = parseInt(str2.substring(24),2);
				str2 = [a,b,c,d];
				return str2;
			},
			piapia:function(val){
				let a = parseInt(val.substring(0,8),2);
				let b = parseInt(val.substring(8,16),2);
				let c = parseInt(val.substring(16,24),2);
				let d = parseInt(val.substring(24),2);
				val = a+'.'+b+'.'+c+'.'+d;//子网
				return val;
			},
			biabia:function(val){
				val = val.split('.')
				let a = Number(val[0]).toString(2).padStart(8,'0');
				let b = Number(val[1]).toString(2).padStart(8,'0');
				let c = Number(val[2]).toString(2).padStart(8,'0');
				let d = Number(val[3]).toString(2).padStart(8,'0');
				val = a+''+b+''+c+''+d;//子网
				return val;
			}
		}
	})