const nodemailer = require("nodemailer");

class ContactController {
    // Render trang liên hệ
    Contact(req, res, next) {
        res.render('contact', { title: "Liên hệ" });
    }

    // Gửi email liên hệ
    PostMail(req, res, next) {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "userlibrarynhom10@gmail.com", // Thay bằng email rác của bạn
                pass: "hrpv ncfe jhrw rfpa", // Thay bằng mật khẩu ứng dụng
            },
        });

        const mailOptions = {
            from: `userlibrarynhom10@gmail.com`,
            to: email,
            subject: `Liên hệ từ ${name}`,
            text: `Chúng tôi đã nhận được phản hồi của bạn. Nội dung :${message}`,  
        };

        try {
            transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Email đã được gửi thành công!" });
        } catch (error) {
            res.status(500).json({ error: "Gửi email thất bại!", details: error.message });
        }
    }
}

module.exports = new ContactController;
