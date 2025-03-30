const nodemailer = require("nodemailer");

class ContactController {
    // Render trang liên hệ
    static Contact(req, res, next) {
        res.render("contact", { title: "Liên hệ" });
    }

    // Gửi email liên hệ
    static async PostMail(req, res) {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "your-email@gmail.com", // Thay bằng email của bạn
                pass: "your-email-password", // Thay bằng mật khẩu ứng dụng
            },
        });

        const mailOptions = {
            from: email,
            to: "your-email@gmail.com",
            subject: `Liên hệ từ ${name}`,
            text: `Người gửi: ${name}\nEmail: ${email}\n\nNội dung:\n${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Email đã được gửi thành công!" });
        } catch (error) {
            res.status(500).json({ error: "Gửi email thất bại!", details: error.message });
        }
    }
}

module.exports = ContactController;
