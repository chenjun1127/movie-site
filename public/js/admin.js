function del(ele, url) {
	var id = $(ele).data("id");
	var tr = $(ele).parents("tr");
	$.ajax({
		type: 'DELETE',
		url: url + '?id=' + id,
	}).done(function(res) {
		if (res.success == 1) {
			if (tr.length > 0) {
				tr.remove();
			}
		}
	})
}