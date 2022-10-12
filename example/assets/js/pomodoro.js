$(function() {

	var isRun = false;
	var timer = 0;
	var cycleNum = 0;
	var cycleTime = 0;
	// 循环次数
	var cycleFun = function(el) {
		var breakNum = $('.break-num');
		if (el.hasClass('plus-btn')) {
			breakNum.html(parseInt(breakNum.html()) + 1);
		} else {
			if (breakNum.html() === "1") {
				return false;
			} else {
				breakNum.html(parseInt(breakNum.html()) - 1);
			}
		}
	};

	// 倒计时时间设置
	var countdownFun = function(el) {
		var sessionNum = $('.session-num');
		var hoursNum = $('.hours-num');
		var minutesNum = $('.minutes-num');
		var newNum = 0;
		var hourVal = 0;
		var minuteVal = 0;
		if (el.hasClass('plus-btn')) {
			newNum = parseInt(sessionNum.html()) + 1;
		} else {
			if (sessionNum.html() === "1") {
				return false;
			} else {
				newNum = parseInt(sessionNum.html()) - 1;
			}
		}
		minuteVal = parseInt(newNum) % 60;
		hourVal = (parseInt(newNum) - minuteVal) / 60;
		sessionNum.html(newNum);
		if (hourVal < 10) {
			hoursNum.html('0' + hourVal);
			$('.ring-hours .mask').css('display', 'block');
			$('.ring-hours .left-half,.ring-hours .right-half').css('transform', 'rotate(' + (hourVal * 15) + 'deg)');
		} else {
			hoursNum.html(hourVal);
			if (hourVal < 12) {
				$('.ring-hours .mask').css('display', 'block');
				$('.ring-hours .left-half,.ring-hours .right-half').css('transform', 'rotate(' + (hourVal * 15) + 'deg)');
			} else {
				$('.ring-hours .left-half').css('transform', 'rotate(180deg)');
				$('.ring-hours .mask').css('display', 'none');
				$('.ring-hours .right-half').css('transform', 'rotate(' + (hourVal * 15) + 'deg)');
			}
		}
		if (minuteVal < 10) {
			minutesNum.html('0' + minuteVal);
			$('.ring-minutes .mask').css('display', 'block');
			$('.ring-minutes .left-half,.ring-minutes .right-half').css('transform', 'rotate(' + (minuteVal * 6) + 'deg)');
		} else {
			minutesNum.html(minuteVal);
			if (minuteVal < 30) {
				$('.ring-minutes .mask').css('display', 'block');
				$('.ring-minutes .left-half,.ring-minutes .right-half').css('transform', 'rotate(' + (minuteVal * 6) + 'deg)');
			} else {
				$('.ring-minutes .left-half').css('transform', 'rotate(180deg)');
				$('.ring-minutes .mask').css('display', 'none');
				$('.ring-minutes .right-half').css('transform', 'rotate(' + (minuteVal * 6) + 'deg)');
			}
		}
	};

	// 倒计时动画
	var timeMove = function() {
		var curTotalTime = (parseInt($('.hours-num').html()) * 3600) + (parseInt($('.minutes-num').html()) * 60) + parseInt($('.seconds-num').html());
		curTotalTime = curTotalTime - 1;
		var lastSecond = curTotalTime;
		if (curTotalTime === 0) {
			curTotalTime = cycleTime;
			if (cycleNum > 0) {
				cycleNum = cycleNum - 1;
				if (cycleNum >= 1) {
					$('.break-num').html(cycleNum);
				}
			}
		}
		var totalSeconds = curTotalTime % 60;
		var totalMinutes = ((curTotalTime - totalSeconds) / 60) % 60;
		var totalHours = (curTotalTime - totalMinutes * 60 - totalSeconds) / 3600;
		if (totalSeconds < 10) {
			$('.seconds-num').html('0' + totalSeconds);
			$('.ring-seconds .mask').css('display', 'block');
			$('.ring-seconds .left-half,.ring-seconds .right-half').css('transform', 'rotate(' + (totalSeconds * 6) + 'deg)');
		} else {
			$('.seconds-num').html(totalSeconds);
			if (totalSeconds < 30) {
				$('.ring-seconds .mask').css('display', 'block');
				$('.ring-seconds .left-half,.ring-seconds .right-half').css('transform', 'rotate(' + (totalSeconds * 6) + 'deg)');
			} else {
				$('.ring-seconds .left-half').css('transform', 'rotate(180deg)');
				$('.ring-seconds .mask').css('display', 'none');
				$('.ring-seconds .right-half').css('transform', 'rotate(' + (totalSeconds * 6) + 'deg)');
			}
		}
		if (totalMinutes < 10) {
			$('.minutes-num').html('0' + totalMinutes);
			$('.ring-minutes .mask').css('display', 'block');
			$('.ring-minutes .left-half,.ring-minutes .right-half').css('transform', 'rotate(' + (totalMinutes * 6) + 'deg)');
		} else {
			$('.minutes-num').html(totalMinutes);
			if (totalMinutes < 30) {
				$('.ring-minutes .mask').css('display', 'block');
				$('.ring-minutes .left-half,.ring-minutes .right-half').css('transform', 'rotate(' + (totalMinutes * 6) + 'deg)');
			} else {
				$('.ring-minutes .left-half').css('transform', 'rotate(180deg)');
				$('.ring-minutes .mask').css('display', 'none');
				$('.ring-minutes .right-half').css('transform', 'rotate(' + (totalMinutes * 6) + 'deg)');
			}
		}
		if (totalHours < 10) {
			$('.hours-num').html('0' + totalHours);
			$('.ring-hours .mask').css('display', 'block');
			$('.ring-hours .left-half,.ring-hours .right-half').css('transform', 'rotate(' + (totalHours * 15) + 'deg)');
		} else {
			$('.hours-num').html(totalHours);
			if (totalHours < 12) {
				$('.ring-hours .mask').css('display', 'block');
				$('.ring-hours .left-half,.ring-hours .right-half').css('transform', 'rotate(' + (totalHours * 15) + 'deg)');
			} else {
				$('.ring-hours .left-half').css('transform', 'rotate(180deg)');
				$('.ring-hours .mask').css('display', 'none');
				$('.ring-hours .right-half').css('transform', 'rotate(' + (totalHours * 15) + 'deg)');
			}
		}
		if (cycleNum === 0 && lastSecond === 0) {
			isRun = false;
			cycleTime = 0;
			clearInterval(timer);
		}
	};

	$('.minus-btn,.plus-btn').off().on('click', function() {
		if (isRun) {
			return false;
		}
		var main = $(this);
		var whichFun = main.parent().find('.break-num');
		if ($('.seconds-num').html() !== '00') {
			$('.seconds-num').html('00');
		}
		if (whichFun.length > 0) {
			cycleFun(main);
		} else {
			countdownFun(main);
		}
	});

	$('.reset-btn').off().on('click', function() {
		if (cycleNum !== 0) {
			isRun = false;
			clearInterval(timer);
			cycleNum = 0;
			cycleTime = 0;
			$('.break-num').html('5');
			$('.session-num').html('25');
			$('.hours-num').html('00');
			$('.minutes-num').html('25');
			$('.seconds-num').html('00');
			$('.left-half,.right-half').removeAttr('style');
			$('.mask').css('display', 'block');
		}
	});

	$('.start-btn').off().on('click', function() {
		if (isRun) {
			return false;
		}
		isRun = true;
		if (cycleTime === 0) {
			cycleNum = parseInt($('.break-num').html());
			cycleTime = (parseInt($('.hours-num').html()) * 3600) + (parseInt($('.minutes-num').html()) * 60) + parseInt($('.seconds-num').html());
		}
		timer = setInterval(timeMove, 1000);
	});

	$('.stop-btn').off().on('click', function() {
		if (isRun) {
			isRun = false;
			clearInterval(timer);
		}
	});
});
