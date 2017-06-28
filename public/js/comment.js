$(function() {
	moment().locale('zh_cn');
	// $("#comment-btn").click(function() {
	// 	$.ajax({
	// 		url: '/admin/user/comment',
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		async: true,
	// 		data: $("#form-comment").serialize(),
	// 		success: function(data) {
	// 			console.log("data", data);
	// 			var html = "",
	// 				chtml = "";
	// 			$.each(data, function(index, item) {
	// 				html += "<div class='row'><div class='col-md-1'><a href='javascript:;' class='comment_link' data-cid='" + item._id + "' data-tid='" + item.from._id + "'><img src='http://s.amazeui.org/media/i/demos/bing-1.jpg', style='width:64px;height:64px;border-radius:50%'/></a></div><div class='col-md-11'><h5 style='color:#337ab7'>" + item.from.name + "<span class='pull-right' style='color:#999'>" + moment(item.meta.createAt).fromNow() + "</span></h5><p>" + item.content + "</p><div class='comment-reply'></div></div></div><hr>"
	// 			})
	// 			$(".comment-list").append(html);
	// 		}
	// 	})
	// })
})


$(".comment_link").click(function() {
	$("textarea").focus();
	var toId = $(this).data("tid");
	var commentId = $(this).data("cid");
	if ($(".comment-tid").length > 0) {
		return
	} else {
		$("<input class='comment-tid'/>").attr({
			type: "hidden",
			name: "comment[tid]",
			value: toId
		}).appendTo("#form-comment");
	}
	if ($(".comment-cid").length > 0) {
		return
	} else {
		$("<input class='comment-cid'/>").attr({
			type: "hidden",
			name: "comment[cid]",
			value: commentId
		}).appendTo("#form-comment");
	}
})