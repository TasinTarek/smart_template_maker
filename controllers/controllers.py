# # -*- coding: utf-8 -*- 
from odoo import http
from odoo.http import request

class SmartTemplateMaker(http.Controller):
    @http.route('/', auth='public', website=True)
    def index(self, **kw):
        # Fetch the data for the partner_id field from the Odoo backend
        partners = request.env['res.partner'].sudo().search([])
        
        # Pass the partners data to the template
        return http.request.render('smart_template_maker.custom_homepage', {
            'partners': partners,
        })


#     @http.route('/smart_template_maker/smart_template_maker/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('smart_template_maker.listing', {
#             'root': '/smart_template_maker/smart_template_maker',
#             'objects': http.request.env['smart_template_maker.smart_template_maker'].search([]),
#         })

#     @http.route('/smart_template_maker/smart_template_maker/objects/<model("smart_template_maker.smart_template_maker"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('smart_template_maker.object', {
#             'object': obj
#         })
