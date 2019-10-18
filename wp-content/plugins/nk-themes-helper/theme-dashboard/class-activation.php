<?php
/**
 * Store data if activation check succeed
 *
 * @package nk-themes-helper
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class NK_Helper_Theme_Dashboard_Activation
 */
class NK_Helper_Theme_Dashboard_Activation {
    /**
     * The single class instance.
     *
     * @since 1.0.0
     * @access private
     *
     * @var object
     */
    private static $_instance = null;

    /**
     * Main Instance
     * Ensures only one instance of this class exists in memory at any one time.
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
            self::$_instance->init_globals();
        }
        return self::$_instance;
    }

    /**
     * NK_Helper_Theme_Dashboard_Activation constructor.
     */
    private function __construct() {
        /* We do nothing here! */
    }

    /**
     * Purchase code
     *
     * @var null
     */
    public $purchase_code = null;

    /**
     * EDD license code
     *
     * @var null
     */
    public $edd_license = null;

    /**
     * License active
     *
     * @var null
     */
    public $active = null;

    /**
     * Init Global variables
     */
    private function init_globals() {
        if ( isset( $_GET['vatomi_action'] ) ) {
            $item_id = isset( $_GET['vatomi_item_id'] ) ? sanitize_text_field( wp_unslash( $_GET['vatomi_item_id'] ) ) : false;

            // vatomi activation.
            if ( 'activate' === $_GET['vatomi_action'] ) {
                $code = isset( $_GET['vatomi_license_code'] ) ? sanitize_text_field( wp_unslash( $_GET['vatomi_license_code'] ) ) : false;

                if ( $code && nk_theme()->theme_dashboard()->theme_id === $item_id ) {
                    nk_theme()->theme_dashboard()->update_option( 'activation_purchase_code', $code );

                    // save in site options to support envato updater plugin.
                    update_option( 'envato_purchase_code_' . $item_id, $code );

                    // remove old activator data.
                    nk_theme()->theme_dashboard()->update_option( 'activation_token', null );
                    nk_theme()->theme_dashboard()->update_option( 'refresh_token', null );
                }
            }

            // vatomi deactivation.
            if ( 'deactivate' === $_GET['vatomi_action'] ) {
                if ( nk_theme()->theme_dashboard()->theme_id === $item_id ) {
                    nk_theme()->theme_dashboard()->update_option( 'activation_purchase_code', null );

                    // save in site options to support envato updater plugin.
                    update_option( 'envato_purchase_code_' . $item_id, null );
                }
            }

            // redirect to the current page but without get variables.
            global $wp;
            // @codingStandardsIgnoreLine
            $redirect = add_query_arg( $_SERVER['QUERY_STRING'], '', admin_url( $wp->request ) );
            $redirect = remove_query_arg(
                array(
                    'vatomi_action',
                    'vatomi_item_id',
                    'vatomi_license_code',
                ), $redirect
            );

            if ( wp_redirect( $redirect ) ) {
                exit;
            }
        }

        // get purchase code from base.
        $this->purchase_code = nk_theme()->theme_dashboard()->get_option( 'activation_purchase_code' );

        // get from site options if no code available.
        if ( ! $this->purchase_code && nk_theme()->theme_dashboard()->theme_id ) {
            $this->purchase_code = get_option( 'envato_purchase_code_' . nk_theme()->theme_dashboard()->theme_id );
        }

        $this->active = ! ! $this->purchase_code;

        // elements active.
        if (
            ! $this->active &&
            nk_theme()->theme_dashboard()->is_envato_elements &&
            'elements' === nk_theme()->theme_dashboard()->get_option( 'purchase_platform' )
        ) {
            $this->active = true;
        }

        // get EDD license key.
        if ( ! $this->active ) {
            $this->edd_license = nk_theme()->theme_dashboard()->get_option( 'edd_license' );
            $this->active = ! ! $this->edd_license;
        }
    }
}
