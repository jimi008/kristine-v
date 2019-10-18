<?php
/**
 * Order tracking form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/form-tracking.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

global $post;

?>

<form action="<?php echo esc_url( get_permalink( $post->ID ) ); ?>" method="post" class="track_order nk-form-style-1">

	<div class="nk-info-box bg-main-1"><div class="nk-info-box-icon"><span class="ion-ios-information"></span></div><?php esc_html_e( 'To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.', 'khaki' ); ?></div>

	<p class="form-row form-row-first"><label for="orderid"><?php esc_html_e( 'Order ID', 'khaki' ); ?></label> <input class="input-text form-control" type="text" name="orderid" id="orderid" value="<?php echo isset( $_REQUEST['orderid'] ) ? esc_attr( wp_unslash( $_REQUEST['orderid'] ) ) : ''; ?>" placeholder="<?php esc_attr_e( 'Found in your order confirmation email.', 'khaki' ); ?>" /></p>
	<p class="form-row form-row-last"><label for="order_email"><?php esc_html_e( 'Billing Email', 'khaki' ); ?></label> <input class="input-text form-control" type="text" name="order_email" id="order_email" value="<?php echo isset( $_REQUEST['order_email'] ) ? esc_attr( wp_unslash( $_REQUEST['order_email'] ) ) : ''; ?>" placeholder="<?php esc_attr_e( 'Email you used during checkout.', 'khaki' ); ?>" /></p>
	<div class="clear"></div>
<div class="nk-gap-1"></div>
	<p class="form-row"><span class="nk-btn nk-btn-color-dark-1 khaki-relative"><?php esc_html_e( 'Track', 'khaki' ); ?><input type="submit" class="khaki-wc-submit" name="track" value="<?php esc_attr_e( 'Track', 'khaki' ); ?>" /></span></p>
    <?php wp_nonce_field( 'woocommerce-order_tracking', 'woocommerce-order-tracking-nonce' ); ?>

</form>
