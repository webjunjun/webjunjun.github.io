$(function() {

	// 初始化AudioContext
	var AudioContext = window.AudioContext || window.webkitAudioContext || false;
	if (!AudioContext) {
		alert('抱歉，你的浏览器不支持the Web Audio API，请使用最新版的chrome浏览器！');
		return false;
	}

	var onBtn = $('.start_btn'),
		stBtn = $('.strict_btn'),
		tips = $('.tips_txt'),
		isUserClick = false,
		count = 0,
		timer = 0,
		userClickNum = -1,
		isAgin = false,
		parArr = [],
		sonArr = [];

	var csDom = $('.circle_section');
	var arrFrequency = [196.00, 220.00, 246.94, 261.63, 293.66];
	// 创建音频上下文
	var audioCtx = new AudioContext();

	// 播放音效
	var audioPlay = function(index) {
		// 创建音调控制对象
		var oscillator = audioCtx.createOscillator();
		// 创建音量控制对象
		var gainNode = audioCtx.createGain();
		// 音调音量关联
		oscillator.connect(gainNode);
		// 音量和设备关联
		gainNode.connect(audioCtx.destination);
		// 音调类型指定为正弦波
		oscillator.type = 'sine';
		// 设置音调频率
		oscillator.frequency.value = arrFrequency[index];
		// 先把当前音量设为0
		gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
		// 0.01秒时间内音量从刚刚的0变成1，线性变化
		gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
		// 声音走起
		oscillator.start(audioCtx.currentTime);
		// 1秒时间内音量从刚刚的1变成0.001，指数变化
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
		// 1秒后停止声音
		oscillator.stop(audioCtx.currentTime + 1);

		if (index < 4) {
			$('.circle_section').eq(index).attr('id', 'circle' + index);
			setTimeout(function() {
				$('.circle_section').eq(index).removeAttr('id');
			}, 250);
		}
	};

	// 判断是否电子正确
	var isCorrect = function(curVal, arrVal) {
		if (curVal !== arrVal[userClickNum]) {
			// 错误发音
			audioPlay(4);
			if (stBtn.is(':checked')) {
				isUserClick = false;
				tips.html('游戏结束！');
				return false;
			}
			tips.html('错误！');
			setTimeout(function() {
				tips.html('');
				isAgin = true;
				isUserClick = false;
				userClickNum = -1;
				sysPlayer(count);
			}, 500);
		} else {
			// 正确发音
			audioPlay(curVal);
			if (userClickNum === count) {
				isUserClick = false;
				userClickNum = -1;
				if (count === 19) {
					tips.html('你赢了！');
					return false;
				}
				setTimeout(function() {
					sysPlayer(count + 1);
				}, 300);
			}
		}
	};

	// 生成亮灯数组
	var lightArrFun = function() {
		for (var i = 0; i < 20; i++) {
			sonArr.push(Math.floor(Math.random() * 4 + 1) - 1);
		}
		for (var j = 0; j < 20; j++) {
			parArr.push(sonArr.slice(0, j + 1));
		}
	};

	// 程序点亮
	var sysPlayer = function(curIndex) {
		var i = -1;
		if (!isAgin) {
			$('.count_area').html(parseInt($('.count_area').html()) + 1);
		} else {
			isAgin = false;
		}
		var sysAutoPlayer = function() {
			i = i + 1;
			if (i >= parArr[curIndex].length - 1) {
				isUserClick = true;
				clearInterval(timer);
			}
			audioPlay(parArr[curIndex][i]);
			timer = setTimeout(sysAutoPlayer, 500);
		};
		timer = setTimeout(sysAutoPlayer, 500);
	};
	onBtn.off().on('click', function() {
		if (onBtn.is(':checked')) {
			stBtn.removeAttr('disabled');
			lightArrFun();
			tips.html('3s');
			var tipsFun = function() {
				if (parseInt(tips.html()) === 0) {
					clearInterval(timer);
					sysPlayer(0);
					tips.html('');
				} else {
					tips.html((parseInt(tips.html()) - 1) + 's');
				}
				timer = setTimeout(tipsFun, 1000);
			};
			timer = setTimeout(tipsFun, 1000);
		} else {
			clearInterval(timer);
			tips.html('');
			stBtn.removeAttr('checked');
			stBtn.attr('disabled', 'disabled');
			sonArr = [];
			parArr = [];
			isUserClick = false;
			count = 0;
			timer = 0;
			userClickNum = -1;
			isAgin = false;
			$('.count_area').html('0');
		}
	});

	$('.circle_section').off().on({
		mousedown: function() {
			if (isUserClick) {
				count = parseInt($('.count_area').html()) - 1;
				userClickNum += 1;
				var index = csDom.index($(this));
				isCorrect(index, parArr[count]);
			}
		}
	});
});
