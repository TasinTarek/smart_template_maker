from odoo import api, models, fields

class smart_template_maker(models.Model):
    _name = 'smart.template.maker'
    _description = 'Smart Template Maker'

    name = fields.Char()
    partner_id = fields.Many2one(string='Partner', comodel_name='res.partner',)

    @api.model
    def get_partner_info(self, partner_id):
        partner = self.env['res.partner'].browse(partner_id)
        return {'name': partner.name}
