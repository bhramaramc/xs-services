var conn = $.db.getConnection();

try {
    var query = "Select IMAGECONTENT From S0016586310.HEROES Where IMAGENAME = 'testfile'";
    var pstmt = conn.prepareStatement(query);
    var rs = pstmt.executeQuery();
    if(rs.next()){
        $.response.headers.set("Content-Disposition", "Content-Disposition: attachment; filename=filename.jpg");
        $.response.contentType = 'image/jpg';
        $.response.setBody(rs.getBlob(1));
        $.response.status = $.net.http.OK;
    }
    else{
    	$.response.contentType = 'text/html';
        $.response.setBody("Image not found");
        $.response.status = 404;
    }

} catch (e) {
    $.response.setBody("Error while downloading : " + e);
    $.response.status = 500;
}
conn.close();