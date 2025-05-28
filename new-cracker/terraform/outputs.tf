output "ec2_public_ip" {
  value = aws_instance.app.public_ip
}

output "rds_endpoint" {
  value = aws_db_instance.db.endpoint
}

output "ec2_ssh" {
  value = "ssh -i ~/.ssh/${var.key_name}.pem ec2-user@${aws_instance.app.public_ip}"
}
