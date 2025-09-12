<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $to = "sujalgujar0@gmail.com"; // Your admin email
    $subject = "New Vehicle Buy/Sell Request";

    // 1️⃣ Collect all form fields
    $fields = [
        'Full Name' => $_POST['name'] ?? 'N/A',
        'Mobile No' => $_POST['contact'] ?? 'N/A',
        'Email Address' => $_POST['email'] ?? 'N/A',
        'Address' => $_POST['address'] ?? 'N/A',
        'Vehicle Type' => $_POST['vehicle_type'] ??'N/A',
        'Vehicle Brand' => $_POST['vehicle_brand'] ?? 'N/A',
        'Vehicle Model' => $_POST['vehicle_model'] ?? 'N/A',
        'Vehicle Year' => $_POST['vehicle_year'] ?? 'N/A',
        'Fuel Type' => $_POST['fuel_type'] ?? 'N/A',
        'Transaction Type' => $_POST['transaction_type'] ??'N/A',
        'Budget Range' => $_POST['budget_range'] ?? 'N/A',
        'Condition Preferred' => $_POST['condition_preferred'] ?? 'N/A',
        'Color Preference' => $_POST['color_preference'] ?? 'N/A',
        'Special Requests' => $_POST['special_requests'] ?? 'N/A',
        'Asking Price' => $_POST['asking_price'] ?? 'N/A',
        'Vehicle Condition' => $_POST['vehicle_condition'] ?? 'N/A',
        'Kilometers Driven' => $_POST['kilometers_driven'] ?? 'N/A',
        'Registration Number' => $_POST['registration_number'] ?? 'N/A',
        'Insurance Valid Till' => $_POST['insurance_valid_till'] ?? 'N/A',
        'Service Type' => $_POST['service_type'] ?? 'N/A',
        'Service Description' => $_POST['description'] ?? 'N/A',
        'Bike Registration Number' => $_POST['bike_registration_number'] ?? 'N/A',
        'Pickup Address' => $_POST['pickup_address'] ?? 'N/A',
        'Appointment Date & Time' => $_POST['appointment_datetime'] ?? 'N/A',
        'Drop-off Date & Time' => $_POST['drop_datetime'] ?? 'N/A',
        'Remarks' => $_POST['remarks'] ?? 'N/A'
    ];

    // 2️⃣ Build email body
    $email_body = "";
    foreach ($fields as $label => $value) {
        if (!empty($value)) {
            $email_body .= "$label: $value\n";
        }
    }

    // 3️⃣ Handle file uploads (single or multiple)
    $attachments = [];
    if (isset($_FILES['vehicle_images'])) {
        $files = $_FILES['vehicle_images'];
        for ($i = 0; $i < count($files['name']); $i++) {
            if ($files['error'][$i] === 0) {
                $attachments[] = [
                    'name' => $files['name'][$i],
                    'type' => $files['type'][$i],
                    'tmp_name' => $files['tmp_name'][$i]
                ];
            }
        }
    }

    // Optional: handle single image (bike, etc.)
    if (isset($_FILES['vehicle_image']) && $_FILES['vehicle_image']['error'] === 0) {
        $attachments[] = [
            'name' => $_FILES['vehicle_image']['name'],
            'type' => $_FILES['vehicle_image']['type'],
            'tmp_name' => $_FILES['vehicle_image']['tmp_name']
        ];
    }

    // 4️⃣ Prepare email with attachments
    $boundary = md5(time());
    $headers = "From: " . ($_POST['email'] ?? 'no-reply@example.com') . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $email_body . "\r\n";

    // Add attachments
    foreach ($attachments as $file) {
        $file_content = file_get_contents($file['tmp_name']);
        $encoded_file = chunk_split(base64_encode($file_content));

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: {$file['type']}; name=\"{$file['name']}\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"{$file['name']}\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= $encoded_file . "\r\n";
    }

    $body .= "--$boundary--";

    // 5️⃣ Send email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to thank-you page
        header("Location: https://anvi-bike.vercel.app/thank-you.html");
        exit();
    } else {
        echo "❌ Failed to send email. Please try again.";
    }
}
?>
